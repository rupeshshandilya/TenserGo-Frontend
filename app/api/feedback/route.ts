import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const body = await req.json();

    const {
       userId,
       category,
       comments
    } = body;


    let {data: feedback} = await axios.post(
        `http://localhost:4000/feedback`,{
            userId,
            category,
            comments
        }
    )

    return NextResponse.json(feedback);
}