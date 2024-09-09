/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { TreeViewConfiguration, SchemaFactory, ValidateRecursiveSchema } from "fluid-framework";

// Define a schema factory that is used to generate classes for the schema
const sf = new SchemaFactory("d302b84c-75f6-4ecd-9663-524f467013e3");

let goalId = 0;
function generateGoalId() {
	return (++goalId).toString();
}

function generateGoalTitle() {
	return `Goal Title ${goalId}`;
}

export class User extends sf.object("User", {
	id: sf.string,
}) {}

export class Goal extends sf.object("Goal", {
	id: sf.string,
	title: sf.string,
	description: sf.string,
	owner: sf.array(User),
}) {}

// export class GoalListItems extends sf.array("GoalListItems", Goal) {}

export class GoalList extends sf.object("GoalList", {
	id: sf.string,
	title: sf.string,
	description: sf.optional(sf.string),
	topLevelGoals: sf.array(Goal),
}) {
	public removeFirst = () => {
		if (this.topLevelGoals.length > 0) this.topLevelGoals.removeAt(0);
	};

	public insertNew = () => {
		this.topLevelGoals.insertAtEnd({
			id: generateGoalId(),
			title: generateGoalTitle(),
			description: "",
			owner: [],
		});
	};
}

// This object is passed into the SharedTree via the schematize method.
export const treeConfigurationV2 = new TreeViewConfiguration(
	// Specify the root type - StringArray.
	{ schema: GoalList },
);
