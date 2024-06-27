import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/model/User";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);
    
        const user = await userModel.findOne({email})
        if(!user)
            return NextResponse.json({error:"user doesn't exist"},{status:400});
        console.log("user exist")
    
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword)
            return NextResponse.json({error:"invalid password"},{status:400});
    
        const tokenData ={
            id: user._id,
            username: user.username,
            email:user.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECREAT_KEY!,{expiresIn:"1d"})
        const response = NextResponse.json({
            message:"login successfull",
            success:true,
            token:token
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }


}
