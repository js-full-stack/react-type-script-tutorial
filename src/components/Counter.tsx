// Интерфейс для описания defaultProps
import React from "react";
import { useState } from "react";

// интерфейс для необязательных пропсов
interface Props {
  initialValue?: number;
  initialStep?: number;
}

const TestCounter = ({ initialValue = 0, initialStep = 1 }: Props) => {
  const [count, setCount] = useState(initialValue);
  const [step, setStep] = useState(initialStep);
  return (
    <div>
      <button onClick={() => setCount(count - step)}>-</button>
      <select value={step} onChange={(e) => setStep(Number(e.target.value))}>
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <button onClick={() => setCount(count + step)}>+</button>

      <p>Value: {count}</p>
    </div>
  );
};
export default TestCounter;
// // интерфейс для пропсов
// interface Props {
//   initialValue: number;
// }

// // интерфейс для стейта
// interface State {
//   value: number;
//   step: number;
// }

// export default class Counter extends Component<Props, State> {
//   // передача типов для класса
//   static defaultProps = {
//     initialValue: 0,
//   };

//   state = {
//     value: this.props.initialValue,
//     step: 1,
//   };

//   increment = () => this.setState(({ value }) => ({ value: value + 1 }));
//   decrement = () => this.setState(({ value }) => ({ value: value - 1 }));
//   // setStep = (e) => this.setState(e.target.value);

//   render() {
//     const { value } = this.state;
//     const { step } = this.state;

//     return (
//       <div>
//         <button onClick={this.decrement}>-</button>
//         {/* <select value={step} onChange={this.setStep}>
//           <option value="1">1</option>
//           <option value="5">5</option>
//           <option value="10">10</option>
//           <option value="20">20</option>
//         </select> */}
//         <p>{value}</p>
//         <button onClick={this.increment}>+</button>
//       </div>
//     );
//   }
// }
