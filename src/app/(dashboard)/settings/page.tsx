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
  title: "Settings - " + AppConfig.title,
};

export default function Page() {
  return (
    <>
      <TitleContent title="Settings" />
      <div className="m-5">
        <Tabs defaultValue="profile">
          <TabsList className="mb-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="currency">Currency</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
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
          <TabsContent value="currency">
            <Card>
              <CardHeader>
                <CardTitle>Currency</CardTitle>
                <CardDescription>Change your account currency.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
