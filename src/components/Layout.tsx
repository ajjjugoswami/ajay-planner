import React, { useEffect, useState } from "react";
import Header from "./Header";
import Head from "next/head";

export const Layout = (props: any) => {
  return (
    <>
      <Head>
        <title>Aj-Planner</title>
      </Head>
      <Header />
      <div className="min-h-screen">
        <main>{props.children}</main>
      </div>
    </>
  );
};
