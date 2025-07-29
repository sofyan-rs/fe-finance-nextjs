import {
  Banknote,
  Bookmark,
  Bot,
  ChartPie,
  ReceiptText,
  Wallet,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: ReceiptText,
    title: "Transactions Management",
    description: "Create, edit, and delete your transactions with ease.",
  },
  {
    icon: Banknote,
    title: "Income and Expense Tracking",
    description: "Get a clear overview of your income and expenses.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Get personalized financial advice and insights with our AI assistant.",
  },
  {
    icon: Wallet,
    title: "Multiple Accounts/Wallets",
    description: "Manage multiple accounts and wallets with ease.",
  },
  {
    icon: Bookmark,
    title: "Categorize Transactions",
    description: "Categorize your transactions with ease.",
  },
  {
    icon: ChartPie,
    title: "Reports and Analytics",
    description:
      "Get detailed reports and analytics to help you manage your money.",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-12 xs:py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
        Everything You Need to Manage Your Money
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
