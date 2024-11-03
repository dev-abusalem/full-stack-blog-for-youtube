"use client";
import Conatiner from "@/app/global/Conatiner";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Home } from "lucide-react";
import Link from "next/link";

function LoginMain() {
  return (
    <section className="bg-primary bg-opacity-10">
      <Conatiner>
        <div className="flex justify-center items-center w-full h-screen">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">LOGIN</TabsTrigger>
              <TabsTrigger value="password">REGISTER</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>LOGIN</CardTitle>
                  <CardDescription>
                    User credintials for login to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <LoginForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>
                    User credintials for register to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <RegisterForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Conatiner>
      <Link
        href="/"
        className="absolute left-8 flex justify-center items-center top-8 w-[50px] h-[50px] bg-white rounded-full shadow"
      >
        <Home className="text-primary font-bold text-xl" />
      </Link>
    </section>
  );
}
export default LoginMain;
