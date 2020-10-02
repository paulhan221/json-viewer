import React, { useState } from "react";
import _ from "lodash";
import values from "./values";
import cx from "classnames";
import "./styles.scss";

const App = () => (
  <div className="app">
    <JSONObject obj={values} />
  </div>
);

const renderValues = (value, baseType) => {
  if (baseType) {
    const valueType = typeof value;
    return <span className={cx('value', { [valueType]: valueType })}>{value}</span>;
  } else if (_.isArray(value)) {
    if (value.length) {
      return (
        <>
          {"["}
          <div>
            {value.map((val, i) => {
              const baseType = typeof val === "string" || typeof val === "number" || typeof val === "boolean";
              return (
                <div className="array-value" key={i}>
                  {renderValues(val, baseType)}
                </div>
              );
            })}
          </div>
          {"]"}
        </>
      );
    } else {
      return '[]';
    }
  } else {
    return (
      <>
        {"{"}
          <div className="object-type"><JSONObject obj={value} /></div>
        {"}"}
      </>
    );
  }
};

const JSONObject = ({ obj }) => {
  const keys = _.keys(obj);

  return keys.map((objKey) => {
    const value = obj[objKey];
    const baseType = typeof value === "string" || typeof value === "number" || typeof value === "boolean";
    return <KeyValues key={objKey} {...{ objKey, value, baseType }} />;
  });
};

const KeyValues = ({ objKey, value, baseType }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="key-value">
      <div
        className={cx('key-container', { clickable: !baseType })}
        onClick={() => !baseType && setExpanded((prevState) => !prevState)}
      >
        {!baseType && <Arrow expanded={expanded} />}
        <div>{objKey}:&nbsp;</div>
      </div>
      {expanded ? <div>{renderValues(value, baseType)}</div> : "..."}
    </div>
  );
};

const Arrow = ({ expanded }) => (
  <div className={cx("arrow", { expanded })}></div>
);

export default App;
