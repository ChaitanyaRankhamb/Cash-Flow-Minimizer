import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ExpenseCard() {

  return (
    <Card className="w-[200px] h-auto rounded-xl shadow-sm bg-background border py-2">
      <CardHeader className="px-4 py-1 gap-2">
        <CardTitle className="text-sm font-medium">
          Add Expense
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-2 space-y-1">
        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="title" className="text-xs text-muted-foreground">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Dinner"
            className="h-8 text-sm"
          />
        </div>

        {/* Amount */}
        <div className="space-y-1">
          <Label htmlFor="amount" className="text-xs text-muted-foreground">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="1200"
            className="h-8 text-sm"
          />
        </div>

        {/* Split Type */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Split</Label>
          <RadioGroup
            defaultValue="equal"
            className="flex gap-2"
          >
            {["equal", "exact", "%"].map((type) => (
              <div
                key={type}
                className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
              >
                <RadioGroupItem value={type === "%" ? "percentage" : type} id={type} />
                <Label htmlFor={type} className="capitalize cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* CTA */}
        <Button size="sm" className="w-full h-8 text-xs rounded-lg">
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
