import CalculatorForm from '../CalculatorForm';

export default function CalculatorFormExample() {
  return (
    <CalculatorForm
      onSubmit={(values) => console.log('Form submitted:', values)}
      isCalculating={false}
    />
  );
}
