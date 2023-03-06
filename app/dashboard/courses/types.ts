type Template = { name: "Java" | "Python", icon: string; };
type UnitDataType = { unit_name: string; };

type Unit = { name: string; id: number; };
type AssignmentDataType = { description: string; due_date: CalendarDate; name: string; template: Template; unit: Unit };

type NotebookDataType = { notebook_name: string; };
type CreateDataType = UnitDataType | AssignmentDataType | NotebookDataType;

export type {CreateDataType, UnitDataType, AssignmentDataType, NotebookDataType, Template};