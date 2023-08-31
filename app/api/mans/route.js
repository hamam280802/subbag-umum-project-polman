import { NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongodb";
import Management from "../../../models/management";

export async function POST(request) {
  const {title, link} = await request.json();
  await connectMongoDB();
  await Management.create({title, link});
  return NextResponse.json({message: "Management created"}, {status: 201});
}

export async function GET() {
  await connectMongoDB();
  const mans = await Management.find({});
  return NextResponse.json({mans});
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Management.findByIdAndDelete(id);
  return NextResponse.json({message: "Management deleted"}, {status: 200});
}