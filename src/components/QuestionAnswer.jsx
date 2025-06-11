import React from "react";
import Answers from "./Answers";

const QuestionAnswer = ({item,index}) => {
  return (
    <div
      key={index + Math.random()}
      className={item.type == "q" ? "flex justify-end" : ""}
    >
      {item.type == "q" ? (
        <li
          key={index + Math.random()}
          className="text-right my-4 border-8 dark:border-zinc-500 dark:bg-zinc-500 bg-zinc-300 border-zinc-300 px-2 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit"
        >
          <Answers index={index} totalResult={1} ans={item.text} />
        </li>
      ) : (
        item.text.map((Item, Index) => (
          <li key={Index + Math.random()}>
            <Answers index={Index} totalResult={item.length} ans={Item} />
          </li>
        ))
      )}
    </div>
  );
};

export default QuestionAnswer;
