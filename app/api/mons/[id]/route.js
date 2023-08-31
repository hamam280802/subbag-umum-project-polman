import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Money from "../../../../models/money";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTitle: title, newLink: link} = await request.json();
    await connectMongoDB();
    await Money.findByIdAndUpdate(id, {title, link});
    return NextResponse.json({message: "Money updated"}, {status: 200})
}

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const money = await Money.findOne({_id: id});
    return NextResponse.json({money}, {status: 200});
}