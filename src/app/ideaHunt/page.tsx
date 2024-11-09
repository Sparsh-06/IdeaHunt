"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "@/utils/options";
import { TableDemo } from "./components/Itables";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  ideaUrl: string;
  ideaTitle: string;
  devName: string;
  ideaTag: string;
  ideaComp: string;
  isOpenSource: boolean;
  ideaDescription: string;
  selectedTechnologies: string[];
}

const Page = () => {
  const { toast } = useToast();
  const animatedComponents = makeAnimated();
  const [formData, setFormData] = useState<FormData>({
    devName: "",
    ideaUrl: "",
    ideaTitle: "",
    ideaComp: "",
    ideaTag: "",
    isOpenSource: false,
    ideaDescription: "",
    selectedTechnologies: [],
  });

  const [isSending, setisSending] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prev) => ({
      ...prev,
      selectedTechnologies: selectedValues,
    }));
  };

  const handleIdeaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSending(true);
    try {
      const response = await fetch(
        "/api/submit-idea",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      const data = await response.json();
      setisSending(false);
      toast({
        variant: "default",
        title: "Idea Submitted Successfully",
        description: "Your idea has been submitted successfully",
      });
      setFormData({
        devName: "",
        ideaUrl: "",
        ideaTitle: "",
        ideaComp: "",
        ideaTag: "",
        isOpenSource: false,
        ideaDescription: "",
        selectedTechnologies: [],
      });
    } catch (error) {
      console.error("Error:", error);
      setisSending(false);
    }
  };

  return (
    <div className="container h-screen py-[14vh]">
      <h2 className="text-4xl font-semibold text-center text-foreground dark:text-gray-100">
        Validate your Ideas
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
        Share your innovative ideas with us and get valuable feedback from the community. Whether it's a new product, a unique solution, or an open-source project, we are here to help you refine and validate your concepts.
      </p>
      <Card className="max-w-5xl mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <form onSubmit={handleIdeaSubmit}>
          <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col">
                <Label htmlFor="ideaUrl" className="text-gray-800 dark:text-gray-200">
                  Link to the product
                </Label>
                <Input
                  type="url"
                  id="ideaUrl"
                  value={formData.ideaUrl}
                  onChange={handleInputChange}
                  placeholder="https://getyourstack.com"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md mt-2"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="devName" className="text-gray-800 dark:text-gray-200">
                  Developer Name
                </Label>
                <Input
                  type="text"
                  id="devName"
                  value={formData.devName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md mt-2"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="ideaTitle" className="text-gray-800 dark:text-gray-200">
                  Product Name
                </Label>
                <Input
                  type="text"
                  id="ideaTitle"
                  value={formData.ideaTitle}
                  onChange={handleInputChange}
                  placeholder="GetYourStack"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md mt-2"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="ideaTag" className="text-gray-800 dark:text-gray-200">
                Tagline
              </Label>
              <Input
                type="text"
                id="ideaTag"
                value={formData.ideaTag}
                onChange={handleInputChange}
                placeholder="'Fake it till you make it'"
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md mt-2"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="ideaComp" className="text-gray-800 dark:text-gray-200">
                Competitors
              </Label>
              <Input
                type="text"
                id="ideaComp"
                value={formData.ideaComp}
                onChange={handleInputChange}
                placeholder="Type N/A if none"
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md mt-2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isOpenSource"
                checked={formData.isOpenSource}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isOpenSource: !!checked,
                  }))
                }
              />
              <Label htmlFor="isOpenSource" className="text-gray-800 dark:text-gray-200">
                Is this an open source project?
              </Label>
            </div>

            <div className="flex flex-col">
              <Label className="text-gray-800 dark:text-gray-200">
                Project Category
              </Label>
              <Select
                id="multiselect"
                backspaceRemovesValue={true}
                closeMenuOnSelect={false}
                className="w-full mt-1 text-gray-800 dark:text-gray-100 dark:bg-gray-800"
                components={animatedComponents}
                isMulti
                options={colourOptions}
                onChange={handleSelectChange}
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="ideaDescription" className="text-gray-800 dark:text-gray-200">
                Idea Description
              </Label>
              <Textarea
                id="ideaDescription"
                value={formData.ideaDescription}
                onChange={handleInputChange}
                placeholder="Describe your idea in detail ..."
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md mt-2"
              />
            </div>

            <Button
              type="submit"
              variant="ghost"
              className={`mt-4 py-2 px-4 rounded-lg bg-gray-900 hover:bg-gray-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSending}
            >
              {isSending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="container p-8 my-10">
        <TableDemo />
      </div>
    </div>
  );
};

export default Page;
