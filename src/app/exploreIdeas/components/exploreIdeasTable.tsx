"use client"

import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Idea {
  id: number
  title: string
  desc: string
  createdAt: string
  devName: string
}

export default function ExploreIdeasTable() {
  const [data, setData] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3200/response/api/all-ideas`)
        const result = await response.json()
        const fetchedIdeas = result.data.map((idea: any) => ({
          ...idea,
          id: idea.id || Math.random(),
          title: typeof idea.response === "string" ? JSON.parse(idea.response).title : idea.title,
          desc: typeof idea.response === "string" ? JSON.parse(idea.response).desc : idea.response.content,
          createdAt: idea.createdAt,
          devName: idea.devName,
        }))
        setData(fetchedIdeas)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="text-center text-gray-400 dark:text-gray-400">Loading...</div>
  }

  return (
    <div className="rounded-lg p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-200 dark:text-gray-200">Top Ideas</h1>
      <p className="text-lg text-gray-400 dark:text-gray-400 mb-6">
        Discover a variety of project ideas shared by the community.
      </p>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption className="text-gray-500 dark:text-gray-500">
            A curated list of innovative project ideas.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-800 dark:bg-gray-800 ">
              <TableHead className="w-[150px] p-4 text-left text-sm font-semibold text-gray-400 dark:text-gray-400">
                Idea Title
              </TableHead>
              <TableHead className="p-4 text-left text-sm font-semibold text-gray-400 dark:text-gray-400">
                Description
              </TableHead>
              <TableHead className="p-4 text-right text-sm font-semibold text-gray-400 dark:text-gray-400">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((idea) => (
              <TableRow
                key={idea.id}
                className="hover:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedIdea(idea)}
              >
                <TableCell className="p-4 font-medium text-gray-300 dark:text-gray-300">
                  {idea.title}
                </TableCell>
                <TableCell className="p-4 text-gray-400 dark:text-gray-400">
                  {idea.desc}
                </TableCell>
                <TableCell className="p-4 text-right text-gray-500 dark:text-gray-500">
                  {new Date(idea.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog for Idea Details */}
      <Dialog open={!!selectedIdea} onOpenChange={() => setSelectedIdea(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedIdea?.title}</DialogTitle>
            <DialogDescription>
              <p className="text-gray-400 dark:text-gray-400 mt-2">{selectedIdea?.desc}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Created on: {selectedIdea ? new Date(selectedIdea.createdAt).toLocaleDateString() : ""}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Developer: {selectedIdea?.devName}
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
