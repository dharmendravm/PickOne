"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { PlusIcon, SwordsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";
import {
  createBattle,
  validateBattle,
  type BattleFormErrors,
} from "@/lib/battle";

export default function AddBattle({ user }: { user: CustomUser }) {
  const [date, setDate] = useState<Date>();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<BattleFormErrors>({});
  const [battleData, setBattleData] = useState({
    title: "",
    description: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setErrors((current) => ({ ...current, image: undefined }));
    }
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    const values = {
      title: battleData.title,
      description: battleData.description,
      image,
      expiresAt: date,
    };
    const validationErrors = validateBattle(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      const { data } = await createBattle(values, user.token);

      toast.success(data.message ?? "Battle created successfully.");
      setBattleData({ title: "", description: "" });
      setDate(undefined);
      setImage(null);
      setOpen(false);
    } catch (error) {
      const apiError = handleApiError(error);
      setErrors(apiError.errors as BattleFormErrors);
      toast.error(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-sm">
          <PlusIcon className="size-4" aria-hidden="true" />
          Add battle
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-6 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="gap-3 border-b bg-muted/35 px-6 py-5 text-left">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <SwordsIcon className="size-5" aria-hidden="true" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Create a battle
            </DialogTitle>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Give people two options worth choosing between.
            </p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6">
          <div className="space-y-2.5">
            <Label htmlFor="title" className="text-sm font-medium">
              Battle title
            </Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="e.g. Beach holiday or mountain escape?"
              value={battleData?.title ?? ""}
              onChange={(e) => {
                setBattleData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
                setErrors((current) => ({ ...current, title: undefined }));
              }}
              className="h-10 bg-muted/30 shadow-xs focus-visible:bg-background"
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <span className="text-xs text-muted-foreground">Required</span>
            </div>
            <Textarea
              name="description"
              id="description"
              className="min-h-28 resize-none bg-muted/30 shadow-xs focus-visible:bg-background"
              placeholder="Add a little context to help people decide..."
              value={battleData?.description ?? ""}
              onChange={(e) => {
                setBattleData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
                setErrors((current) => ({ ...current, description: undefined }));
              }}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2.5">
              <Label htmlFor="image" className="text-sm font-medium">
                Image
              </Label>
              <Input
                type="file"
                name="image"
                id="image"
                accept="image/jpeg,image/png,image/webp"
                className="h-10 cursor-pointer bg-muted/30 py-1.5 text-sm file:mr-3 file:rounded-md file:bg-background file:px-2 file:text-xs file:shadow-xs hover:file:bg-muted"
                onChange={handleImageChange}
              />
              {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="expiry-date" className="text-sm font-medium">
                Expires at
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="expiry-date"
                    variant="outline"
                    data-empty={!date}
                    className="h-10 w-full justify-start bg-muted/30 text-left font-normal shadow-xs hover:bg-muted/60 data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon className="size-4" />
                    {date ? (
                      format(date.toDateString(), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto rounded-xl p-0 shadow-lg"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setErrors((current) => ({ ...current, expires_at: undefined }));
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.expires_at && <p className="text-sm text-destructive">{errors.expires_at}</p>}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <SwordsIcon className="size-4" aria-hidden="true" />
              {loading ? "Creating..." : "Create battle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
