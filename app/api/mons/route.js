import { NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongodb";
import Money from "../../../models/money";

export async function POST(request) {
  const {title, link} = await request.json();
  await connectMongoDB();
  await Money.create({title, link});
  return NextResponse.json({message: "Money created"}, {status: 201});
}

export async function GET() {
  await connectMongoDB();
  const mons = await Money.find({});
  return NextResponse.json({mons});
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Money.findByIdAndDelete(id);
  return NextResponse.json({message: "Money deleted"}, {status: 200});
}