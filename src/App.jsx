import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import DollarIcon from "./assets/images/icon-dollar.svg";
import PersonIcon from "./assets/images/icon-person.svg";

const TIP_PERCENTAGES = [
  { number: "5", text: "five" },
  { number: "10", text: "ten" },
  { number: "15", text: "fifteen" },
  { number: "25", text: "twenty-five" },
  { number: "50", text: "fifty" },
];

const ACTIONS = {
  // totalAmount
  TOTAL_AMOUNT_VALUE_CHANGE: "TOTAL_AMOUNT_VALUE_CHANGE",
  TOTAL_AMOUNT_PRISTINE_CHANGE: "TOTAL_AMOUNT_PRISTINE_CHANGE",
  TOTAL_AMOUNT_VALID_CHANGE: "TOTAL_AMOUNT_VALID_CHANGE",
  TOTAL_AMOUNT_FEEDBACK_CHANGE: "TOTAL_AMOUNT_FEEDBACK_CHANGE",
  // tipAmount
  TIP_AMOUNT_VALUE_CHANGE: "TIP_AMOUNT_VALUE_CHANGE",
  // customTipAmount
  CUSTOM_TIP_AMOUNT_VALUE_CHANGE: "CUSTOM_TIP_AMOUNT_VALUE_CHANGE",
  // shareBetween
  SHARE_BETWEEN_VALUE_CHANGE: "SHARE_BETWEEN_VALUE_CHANGE",
  SHARE_BETWEEN_PRISTINE_CHANGE: "SHARE_BETWEEN_PRISTINE_CHANGE",
  SHARE_BETWEEN_VALID_CHANGE: "SHARE_BETWEEN_VALID_CHANGE",
  SHARE_BETWEEN_FEEDBACK_CHANGE: "SHARE_BETWEEN_FEEDBACK_CHANGE",
  // perPersonTotalAmount
  PER_PERSON_TOTAL_AMOUNT_VALUE_CHANGE: "PER_PERSON_TOTAL_AMOUNT_VALUE_CHANGE",
  // perPersonTipAmount
  PER_PERSON_TIP_AMOUNT_VALUE_CHANGE: "PER_PERSON_TIP_AMOUNT_VALUE_CHANGE",
  // resetBtn
  RESET_BTN_DISABLED_CHANGE: "RESET_BTN_DISABLED_CHANGE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS[action.type]:
      return {
        ...state,
        [action.payload.property]: {
          ...state[action.payload.property],
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      throw new Error(
        "[Error]: Oops! Something went wrong. Unknown action was dispatched."
      );
  }
};

const initState = {
  totalAmount: {
    value: 0,
    pristine: true,
    valid: false,
    feedback: "",
  },
  tipAmount: {
    value: 15,
  },
  customTipAmount: {
    value: 0,
  },
  shareBetween: {
    value: 0,
    pristine: true,
    valid: false,
    feedback: "",
  },
  perPersonTotalAmount: {
    value: 0,
  },
  perPersonTipAmount: {
    value: 0,
  },
  resetBtn: {
    disabled: true,
  },
};

const calculateTip = (total, tip, split) => {
  if (total && tip && split) {
    return ((total / 100) * tip) / split;
  } else {
    return;
  }
};

const calculateTotal = (total, split) => {
  return total / split;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const initRender = useRef(true);

  // totalAmount
  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    if (
      state.totalAmount.value === 0 &&
      !state.totalAmount.pristine &&
      !state.totalAmount.valid
    ) {
      dispatch({
        type: ACTIONS.TOTAL_AMOUNT_FEEDBACK_CHANGE,
        payload: {
          property: "totalAmount",
          key: "feedback",
          value: "Can't be zero",
        },
      });
    } else {
      dispatch({
        type: ACTIONS.TOTAL_AMOUNT_FEEDBACK_CHANGE,
        payload: {
          property: "totalAmount",
          key: "feedback",
          value: "",
        },
      });
    }
  }, [
    state.totalAmount.value,
    state.totalAmount.pristine,
    state.totalAmount.valid,
  ]);

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    dispatch({
      type: ACTIONS.TOTAL_AMOUNT_VALID_CHANGE,
      payload: {
        property: "totalAmount",
        key: "valid",
        value: state.totalAmount.value > 0,
      },
    });
  }, [state.totalAmount.value]);

  const handleTotalAmountValue = (e) => {
    const value = +e.target.value;
    dispatch({
      type: ACTIONS.TOTAL_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "totalAmount",
        key: "value",
        value,
      },
    });
  };

  const handleTotalAmountPristine = () => {
    if (state.totalAmount.pristine) {
      dispatch({
        type: ACTIONS.TOTAL_AMOUNT_PRISTINE_CHANGE,
        payload: {
          property: "totalAmount",
          key: "pristine",
          value: false,
        },
      });
    } else {
      return;
    }
  };

  // tipAmount
  const handleTipAmountValueChange = (e) => {
    const value = +e.target.value;
    dispatch({
      type: ACTIONS.TIP_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "tipAmount",
        key: "value",
        value,
      },
    });
    dispatch({
      type: ACTIONS.CUSTOM_TIP_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "customTipAmount",
        key: "value",
        value: 0,
      },
    });
  };

  // customTipAmount
  const handleCustomTipAmountValueChange = (e) => {
    const value = +e.target.value;
    dispatch({
      type: ACTIONS.CUSTOM_TIP_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "customTipAmount",
        key: "value",
        value,
      },
    });
    dispatch({
      type: ACTIONS.TIP_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "tipAmount",
        key: "value",
        value: 0,
      },
    });
  };

  // shareBetween
  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    if (
      state.shareBetween.value === 0 &&
      !state.shareBetween.pristine &&
      !state.shareBetween.valid
    ) {
      dispatch({
        type: ACTIONS.SHARE_BETWEEN_FEEDBACK_CHANGE,
        payload: {
          property: "shareBetween",
          key: "feedback",
          value: "Can't be zero",
        },
      });
    } else {
      dispatch({
        type: ACTIONS.SHARE_BETWEEN_FEEDBACK_CHANGE,
        payload: {
          property: "shareBetween",
          key: "feedback",
          value: "",
        },
      });
    }
  }, [
    state.shareBetween.value,
    state.shareBetween.pristine,
    state.shareBetween.valid,
  ]);

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    dispatch({
      type: ACTIONS.SHARE_BETWEEN_VALID_CHANGE,
      payload: {
        property: "shareBetween",
        key: "valid",
        value: state.shareBetween.value > 0,
      },
    });
  }, [state.shareBetween.value]);

  const handleShareBetweenValue = (e) => {
    const value = +e.target.value;
    dispatch({
      type: ACTIONS.SHARE_BETWEEN_VALUE_CHANGE,
      payload: {
        property: "shareBetween",
        key: "value",
        value,
      },
    });
  };

  const handleShareBetweenPristine = () => {
    if (state.shareBetween.pristine) {
      dispatch({
        type: ACTIONS.SHARE_BETWEEN_PRISTINE_CHANGE,
        payload: {
          property: "shareBetween",
          key: "pristine",
          value: false,
        },
      });
    }
  };

  // Reset form
  const handleReset = () => {
    dispatch({
      type: ACTIONS.TOTAL_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "totalAmount",
        key: "value",
        value: 0,
      },
    });
    dispatch({
      type: ACTIONS.TIP_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "tipAmount",
        key: "value",
        value: 15,
      },
    });
    dispatch({
      type: ACTIONS.CUSTOM_TIP_AMOUNT_VALUE_CHANGE,
      payload: {
        property: "customTipAmount",
        key: "value",
        value: 0,
      },
    });
    dispatch({
      type: ACTIONS.SHARE_BETWEEN_VALUE_CHANGE,
      payload: {
        property: "shareBetween",
        key: "value",
        value: 0,
      },
    });
  };

  // Calculating
  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    if (
      state.totalAmount.value > 0 &&
      (state.tipAmount.value > 0 || state.customTipAmount.value > 0) &&
      state.shareBetween.value > 0
    ) {
      dispatch({
        type: ACTIONS.PER_PERSON_TOTAL_AMOUNT_VALUE_CHANGE,
        payload: {
          property: "perPersonTotalAmount",
          key: "value",
          value: calculateTotal(
            state.totalAmount.value,
            state.shareBetween.value
          ),
        },
      });
      dispatch({
        type: ACTIONS.PER_PERSON_TIP_AMOUNT_VALUE_CHANGE,
        payload: {
          property: "perPersonTipAmount",
          key: "value",
          value: calculateTip(
            state.totalAmount.value,
            state.customTipAmount.value
              ? state.customTipAmount.value
              : state.tipAmount.value,
            state.shareBetween.value
          ),
        },
      });
      dispatch({
        type: ACTIONS.RESET_BTN_DISABLED_CHANGE,
        payload: {
          property: "resetBtn",
          key: "disabled",
          value: false,
        },
      });
    } else {
      dispatch({
        type: ACTIONS.PER_PERSON_TOTAL_AMOUNT_VALUE_CHANGE,
        payload: {
          property: "perPersonTotalAmount",
          key: "value",
          value: 0,
        },
      });
      dispatch({
        type: ACTIONS.PER_PERSON_TIP_AMOUNT_VALUE_CHANGE,
        payload: {
          property: "perPersonTipAmount",
          key: "value",
          value: 0,
        },
      });
      dispatch({
        type: ACTIONS.RESET_BTN_DISABLED_CHANGE,
        payload: {
          property: "resetBtn",
          key: "disabled",
          value: true,
        },
      });
    }
  }, [
    state.totalAmount.value,
    state.tipAmount.value,
    state.customTipAmount.value,
    state.shareBetween.value,
  ]);

  const tipPercentagesOutput = TIP_PERCENTAGES.map((item) => (
    <li key={item.number}>
      <input
        type="radio"
        name="tip"
        id={`tip-percentage--${item.text}`}
        value={item.number}
        onChange={handleTipAmountValueChange}
        checked={+item.number === state.tipAmount.value}
      />
      <label htmlFor={`tip-percentage--${item.text}`}>{item.number}%</label>
    </li>
  ));

  return (
    <main>
      <h1>
        <span>SPLI</span>
        <span>TTER</span>
      </h1>
      <section>
        <div className="splitter__input">
          <div className="total-amount">
            <div
              className={`form-field${
                !state.totalAmount.pristine && !state.totalAmount.valid
                  ? "--invalid"
                  : ""
              }`}
            >
              <label htmlFor="bill">Bill</label>
              <input
                type="number"
                name="bill"
                min={0}
                id="bill"
                value={state.totalAmount.value}
                onChange={handleTotalAmountValue}
                onBlur={handleTotalAmountPristine}
                placeholder="0"
              />
              <span>
                <img src={DollarIcon} alt="Svg icon of the dollar sign" />
              </span>
              <span>{state.totalAmount.feedback}</span>
            </div>
          </div>
          <div className="select-tip">
            <p>Select tip %</p>
            <ul>
              <>{tipPercentagesOutput}</>
              <li>
                <input
                  type="number"
                  placeholder="CUSTOM"
                  min={0}
                  name="custom-tip-amount"
                  value={state.customTipAmount.value}
                  onChange={handleCustomTipAmountValueChange}
                />
              </li>
            </ul>
          </div>
          <div className="split-between">
            <div
              className={`form-field${
                !state.shareBetween.pristine && !state.shareBetween.valid
                  ? "--invalid"
                  : ""
              }`}
            >
              <label htmlFor="share">Number of people</label>
              <input
                type="number"
                min={0}
                name="share"
                id="share"
                value={state.shareBetween.value}
                onChange={handleShareBetweenValue}
                onBlur={handleShareBetweenPristine}
                placeholder="0"
              />
              <span>
                <img src={PersonIcon} alt="Svg icon of the person" />
              </span>
              <span>{state.shareBetween.feedback}</span>
            </div>
          </div>
        </div>
        <div className="splitter__output">
          <p>
            <span>Tip amount</span>
            <span>/ person</span>
            <span>{state.perPersonTipAmount.value.toFixed(2)}$</span>
          </p>
          <p>
            <span>Total</span>
            <span>/ person</span>
            <span>{state.perPersonTotalAmount.value.toFixed(2)}$</span>
          </p>
          <div>
            <button
              type="button"
              disabled={state.resetBtn.disabled}
              onClick={handleReset}
            >
              RESET
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
