import { TitleContent } from "@/components/title-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";
import { FormAccount } from "./components/form-account";
import { FormPassword } from "./components/form-password";

export const metadata: Metadata = {
  title: "Account - " + AppConfig.title,
};

export default function Page() {
  return (
    <>
      <TitleContent title="Account" />
      <div className="m-5">
        <Tabs defaultValue="account">
          <TabsList className="mb-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account profile.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormAccount />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your account password.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormPassword />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
