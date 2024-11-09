"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Idea {
  projectID: string;
  ideaTitle: string;
  devName: string;
  ideaDescription: string;
  isOpenSource: boolean;
  upvotes: number;
  downvotes: number;
}

const staticIdeas = [
  {
    ideaName: "AI Chatbot",
    devName: "Alice",
    ideaDesc: "A chatbot that uses AI to answer customer queries.",
    upvotes: 120,
    isOpenSource: true,
    downvotes: 10,
  },
];

export function TableDemo() {
  const [fetchedIdeas, setFetchedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const response = await fetch(
          "http://localhost:3200/responses/api/getValidationIdeas"
        ).then((res) => res.json());
        setFetchedIdeas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    }
    fetchIdeas();
  }, []);

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700">
      <Table className="min-w-full bg-gray-800 rounded-lg shadow-sm">
        <TableCaption className="text-gray-400 font-semibold">Recent Ideas</TableCaption>
        <TableHeader className="bg-gray-800 text-gray-300">
          <TableRow>
            <TableHead className="px-6 py-3">Idea Name</TableHead>
            <TableHead className="px-6 py-3">Dev Name</TableHead>
            <TableHead className="px-6 py-3">Description</TableHead>
            <TableHead className="px-6 py-3 text-right">Upvotes</TableHead>
            <TableHead className="px-6 py-3 text-right">Downvotes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                Loading...
              </TableCell>
            </TableRow>
          ) : fetchedIdeas.length > 0 ? (
            fetchedIdeas.map((IdeaData) => (
              <TableRow key={IdeaData.projectID} className="hover:bg-gray-700 transition duration-150">
                <TableCell className="px-6 py-3 font-medium text-blue-400">
                  <Link href={`/ideaHunt/${IdeaData.projectID}`} className="hover:underline">
                    {IdeaData.ideaTitle}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-3 text-gray-300">
                  <Link href={`/ideaHunt/${IdeaData.projectID}`} className="hover:underline">
                    {IdeaData.devName}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-3 text-gray-300">
                  <Link href={`/ideaHunt/${IdeaData.projectID}`} className="hover:underline">
                    {IdeaData.ideaDescription}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-3 text-right text-gray-400">{IdeaData.upvotes}</TableCell>
                <TableCell className="px-6 py-3 text-right text-gray-400">{IdeaData.downvotes}</TableCell>
              </TableRow>
            ))
          ) : (
            staticIdeas.map((IdeaData) => (
              <TableRow key={IdeaData.ideaName} className="hover:bg-gray-700 transition duration-150">
                <TableCell className="px-6 py-3 font-medium text-blue-400">{IdeaData.ideaName}</TableCell>
                <TableCell className="px-6 py-3 text-gray-300">{IdeaData.devName}</TableCell>
                <TableCell className="px-6 py-3 text-gray-300">{IdeaData.ideaDesc}</TableCell>
                <TableCell className="px-6 py-3 text-right text-gray-400">{IdeaData.upvotes}</TableCell>
                <TableCell className="px-6 py-3 text-right text-gray-400">{IdeaData.downvotes}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
