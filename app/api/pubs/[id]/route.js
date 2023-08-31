import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Public from "../../../../models/public";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTitle: title, newLink: link} = await request.json();
    await connectMongoDB();
    await Public.findByIdAndUpdate(id, {title, link});
    return NextResponse.json({message: "Public updated"}, {status: 200})
}

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const publics = await Public.findOne({_id: id});
    return NextResponse.json({publics}, {status: 200});
}