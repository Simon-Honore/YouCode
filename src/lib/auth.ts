import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

// Cette fonction getAuthSession permet de récupérer le "current user" dans des client components, API Routes et Server Actions

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse];

export const getAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  const session = await getServerSession(...parameters, authOptions);
  return session;
};
