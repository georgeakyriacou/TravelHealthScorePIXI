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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Coins, Clock, FileText } from "lucide-react";

const formSchema = z.object({
  portfolioSize: z.string().min(1, "Please select your portfolio size"),
  adr: z.coerce.number().min(1, "ADR must be greater than 0"),
  hoursPerWeek: z.coerce.number().min(0).max(168, "Max 168 hours in a week"),
  annualBudget: z.coerce.number().min(0),
});

export type CalculatorFormValues = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  onSubmit: (values: CalculatorFormValues) => void;
  isCalculating?: boolean;
}

function formatNumberWithCommas(value: string | number): string {
  const num = typeof value === 'string' ? value.replace(/,/g, '') : value.toString();
  const parts = num.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function parseFormattedNumber(value: string): string {
  return value.replace(/,/g, '');
}

export default function CalculatorForm({ onSubmit, isCalculating }: CalculatorFormProps) {
  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioSize: "small",
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
            name="portfolioSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Which best describes your portfolio?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-portfolio">
                      <SelectValue placeholder="Select portfolio size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">A single property</SelectItem>
                    <SelectItem value="small">A small group (2-5 properties)</SelectItem>
                    <SelectItem value="large">A large group (6+ properties)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Select the option that best fits your portfolio
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
                    type="text"
                    placeholder="1,000"
                    value={formatNumberWithCommas(field.value || '')}
                    onChange={(e) => {
                      const parsed = parseFormattedNumber(e.target.value);
                      const numValue = parsed === '' ? '' : Number(parsed);
                      field.onChange(numValue);
                    }}
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
                    type="text"
                    placeholder="20,000"
                    value={formatNumberWithCommas(field.value || '')}
                    onChange={(e) => {
                      const parsed = parseFormattedNumber(e.target.value);
                      const numValue = parsed === '' ? '' : Number(parsed);
                      field.onChange(numValue);
                    }}
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
