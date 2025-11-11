import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2, Coins, Clock, FileText } from "lucide-react";

const formSchema = z.object({
  properties: z.coerce.number().min(1, "At least 1 property required").max(100),
  adr: z.coerce.number().min(1, "ADR must be greater than 0"),
  hoursPerWeek: z.coerce.number().min(0).max(168, "Max 168 hours in a week"),
  annualBudget: z.coerce.number().min(0),
});

export type CalculatorFormValues = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  onSubmit: (values: CalculatorFormValues) => void;
  isCalculating?: boolean;
}

export default function CalculatorForm({ onSubmit, isCalculating }: CalculatorFormProps) {
  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      properties: 2,
      adr: 1000,
      hoursPerWeek: 5,
      annualBudget: 20000,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="properties"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Number of Properties
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2"
                    {...field}
                    data-testid="input-properties"
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  How many properties do you manage?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adr"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  Average Daily Rate (£)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1000"
                    {...field}
                    data-testid="input-adr"
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Your property's ADR in pounds sterling
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hoursPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Hours Wasted Per Week
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                    data-testid="input-hours"
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Time spent on manual asset requests weekly
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="annualBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Annual Content Budget (£)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="20000"
                    {...field}
                    data-testid="input-budget"
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Estimated annual content creation budget
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto md:px-12"
          size="lg"
          disabled={isCalculating}
          data-testid="button-calculate"
        >
          {isCalculating ? "Calculating..." : "Calculate My Score"}
        </Button>
      </form>
    </Form>
  );
}
