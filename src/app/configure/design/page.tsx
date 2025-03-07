import { db } from "@/db";
import { notFound } from "next/navigation";
import { type } from "os";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) return notFound();

  const { imgUrl, width, height } = configuration;

  return (
    <DesignConfigurator configId={id} imgUrl={imgUrl} imgDimensions={{ width: width, height: height }} />
  );
}

export default Page;
