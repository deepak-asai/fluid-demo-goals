// /*!
//  * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
//  * Licensed under the MIT License.
//  */

// import { TreeViewConfiguration, SchemaFactory, ValidateRecursiveSchema } from "fluid-framework";

// // Define a schema factory that is used to generate classes for the schema
// const sf = new SchemaFactory("d302b84c-75f6-4ecd-9663-524f467013e3");

// let goalListId = 0;
// function generateGoalListId() {
// 	return (goalListId++).toString();
// }

// function generateGoalListTitle() {
// 	return `Goal List Title ${goalListId}`;
// }

// let goalId = 0;
// function generateGoalId() {
// 	return (goalId++).toString();
// }

// function generateGoalTitle() {
// 	return `Goal Title ${goalId}`;
// }

// let subGoalId = 0;
// function generateSubGoalId() {
// 	return (subGoalId++).toString();
// }

// function generateSubGoalTitle() {
// 	return `Sub Goal Title ${subGoalId}`;
// }

// export class User extends sf.object("User", {
// 	id: sf.string,
// 	name: sf.string,
// }) {}

// export class Goal extends sf.object("Goal", {
// 	id: sf.string,
// 	title: sf.string,
// 	description: sf.string,
// 	owner: sf.array(User),
// }) {}

// export class GoalListItems extends sf.array("GoalListItems", Goal) {}

// export class GoalWithSubGoals extends sf.object("GoalWithSubGoals", {
// 	goal: Goal,
// 	subGoals: GoalListItems,
// }) {
// 	public removeFirst = () => {
// 		if (this.subGoals.length > 0) this.subGoals.removeAt(0);
// 	};

// 	public insertNew = () => {
// 		this.subGoals.insertAtEnd({
// 			id: generateGoalId(),
// 			title: generateGoalTitle(),
// 			description: "",
// 			owner: [],
// 		});
// 	};
// }

// export class GoalWithSubGoalsItems extends sf.array("GoalWithSubGoalsItems", GoalWithSubGoals) {}

// export class GoalList extends sf.object("GoalList", {
// 	goalsWithSubGoals: GoalWithSubGoalsItems,
// 	id: sf.string,
// 	title: sf.string,
// 	description: sf.optional(sf.string),
// 	topLevelGoals: sf.optional(GoalListItems)
// }) {
// 	public removeFirst = () => {
// 		if (this.goalsWithSubGoals.length > 0) this.goalsWithSubGoals.removeAt(0);
// 	};

// 	public insertNew = () => {
// 		this.goalsWithSubGoals.insertAtEnd({
// 			goal: {
// 				id: generateSubGoalId(),
// 				title: generateSubGoalTitle(),
// 				description: "",
// 				owner: [],
// 			},
// 			subGoals: [],
// 		});
// 	};
// }

// export class GoalListCollection extends sf.array("GoalListCollection", GoalList) {
// 	public removeFirst = () => {
// 		if (this.length > 0) this.removeAt(0);
// 	};

// 	public insertNew = () => {
// 		this.insertAtEnd({
// 			goalsWithSubGoals: [],
// 			id: generateGoalListId(),
// 			title: generateGoalListTitle(),
// 			description: "",
// 		});
// 	};
// }

// // This object is passed into the SharedTree via the schematize method.
// export const treeConfiguration = new TreeViewConfiguration(
// 	// Specify the root type - StringArray.
// 	{ schema: GoalListCollection },
// );
