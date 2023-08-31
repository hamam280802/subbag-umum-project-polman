import { NextResponse } from "next/server";
import Employee from "../../../../models/employee";
import connectMongoDB from "../../../libs/mongodb";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTitle: title, newLink: link} = await request.json();
    await connectMongoDB();
    await Employee.findByIdAndUpdate(id, {title, link});
    return NextResponse.json({message: "Employee updated"}, {status: 200})
}

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const employee = await Employee.findOne({_id: id});
    return NextResponse.json({employee}, {status: 200});
}