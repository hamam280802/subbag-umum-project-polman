import { NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongodb";
import Public from "../../../models/public";

export async function POST(request) {
  const {title, link} = await request.json();
  await connectMongoDB();
  await Public.create({title, link});
  return NextResponse.json({message: "Public created"}, {status: 201});
}

export async function GET() {
  await connectMongoDB();
  const pubs = await Public.find({});
  return NextResponse.json({pubs});
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Public.findByIdAndDelete(id);
  return NextResponse.json({message: "Public deleted"}, {status: 200});
}