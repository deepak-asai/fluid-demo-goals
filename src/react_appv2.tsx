/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { ReactNode, useEffect, useState } from "react";
import { TreeView, Tree } from "fluid-framework";
import { Goal, GoalList } from "./schema_v2.js";

export function ReactAppV2(props: { data: TreeView<typeof GoalList> }): JSX.Element {
	return (
		<div className="flex flex-col gap-3 items-center justify-center content-center m-6">
			<div className="flex flex-row gap-3 justify-center flex-wrap w-full h-full">
				<GoalListComponent list={props.data.root} />
			</div>
		</div>
	);
}

export function GoalListComponent(props: { list: GoalList }): JSX.Element {
	const [count, setCount] = useState(props.list.topLevelGoals.length);

	// Register for change events on the list when the component mounts.
	// Any time the list changes, the app will update
	useEffect(() => {
		const unsubscribe = Tree.on(props.list.topLevelGoals, "nodeChanged", () => {
			setCount(props.list.topLevelGoals.length);
		});
		return unsubscribe;
	}, [props.list]);

	return (
		<div className="flex flex-col gap-3 justify-center content-center m-6">
			<div className="flex flex-row gap-3 justify-center content-center ">
				<ItemCount count={count} />
			</div>
			<div className="flex flex-row gap-3 justify-center content-center ">
				Insert Goal: <AddGoalButton insert={props.list.insertNew} />
				Remove first goal: <RemoveGoalButton remove={props.list.removeFirst} />
			</div>
			<div className="flex flex-col gap-3 justify-center content-center ">
				{props.list.topLevelGoals.map((goal, index) => (
					<GoalComponent key={index} goal={goal} />
				))}
			</div>
		</div>
	);
}

function GoalComponent(props: { goal: Goal }): JSX.Element {
	// const [count, setCount] = useState(props.goalWithSubGoals.subGoals.length);

	// useEffect(() => {
	// 	const unsubscribe = Tree.on(props.goalWithSubGoals.subGoals, "nodeChanged", () => {
	// 		setCount(props.goalWithSubGoals.subGoals.length);
	// 	});
	// 	return unsubscribe;
	// });

	return (
		<div className="flex flex-col gap-2 justify-center content-center mt-4">
			<div className="text-lg font-bold">{props.goal.id}</div>
			<div className="text-lg font-bold">{props.goal.title}</div>
		</div>
	);
}

function AddGoalButton(props: { insert: () => void }): JSX.Element {
	const handleClick = () => {
		// Add a new goal
		props.insert();
	};

	return <Button handleClick={handleClick}>Add Goal</Button>;
}

function RemoveGoalButton(props: { remove: () => void }): JSX.Element {
	const handleClick = () => {
		// Remove the goal
		// Implement the logic to remove the goal here
		props.remove();
	};

	return <Button handleClick={handleClick}>Remove Goal</Button>;
}

export function ItemCount(props: { count: number }): JSX.Element {
	// Show the count of items in the list
	return (
		<div className="flex flex-col justify-center bg-black w-24 h-24 rounded-full shadow-md">
			<div className="text-center text-4xl font-extrabold bg-transparent text-white">
				{props.count}
			</div>
		</div>
	);
}

export function Button(props: { children: ReactNode; handleClick: () => void }): JSX.Element {
	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
			onClick={() => props.handleClick()}
		>
			{props.children}
		</button>
	);
}
