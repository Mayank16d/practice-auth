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
        const {username, email, password} = reqBody;
        console.log(reqBody);

        const user = await userModel.findOne({email});
        if(user)
            return NextResponse.json({error: "user already exist with this email id"}, { status : 400})
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newuser = new userModel({
            username,
            email,
            password:hashedPassword,
            verifyCode,
            verifyCodeExpiry:expiryDate
        });
        const savedUser = await newuser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "new user created successfully",
            success:true,
            savedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}