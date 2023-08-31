import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Management from "../../../../models/management";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTitle: title, newLink: link} = await request.json();
    await connectMongoDB();
    await Management.findByIdAndUpdate(id, {title, link});
    return NextResponse.json({message: "Management updated"}, {status: 200})
}

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const management = await Management.findOne({_id: id});
    return NextResponse.json({management}, {status: 200});
}