import { NextResponse } from "next/server";
import Employee from "../../../models/employee";
import connectMongoDB from "../../libs/mongodb";

export async function POST(request) {
  const {title, link} = await request.json();
  await connectMongoDB();
  await Employee.create({title, link});
  return NextResponse.json({message: "Employee created"}, {status: 201});
}

export async function GET() {
  await connectMongoDB();
  const emps = await Employee.find({});
  return NextResponse.json({emps});
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Employee.findByIdAndDelete(id);
  return NextResponse.json({message: "Employee deleted"}, {status: 200});
}