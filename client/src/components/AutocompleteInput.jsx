import { useState } from "react";
import Autosuggest from "react-autosuggest";

function shouldRenderSuggestions() {
  return true;
}

const AutocompleteInput = ({ options = [], onSelect }) => {
  const [selected, setSelected] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getSuggestions(value) {
    // const inputValue = value.trim().toLowerCase();
    // const inputLength = inputValue.length;

    // return inputLength === 0
    //   ? []
    //   : options.filter(
    //       (option) =>
    //         option.label.toLowerCase().slice(0, inputLength) === inputValue
    //     );
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");

    return options.filter((option) => regex.test(option.label));
  }

  const getSuggestionValue = (suggestion) => {
    setSelected(suggestion.label);
    onSelect(suggestion.label);
    return suggestion.label;
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.label}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    // placeholder: "Select",
    value: selected,
    onChange: (event, { newValue }) => {
      setSelected(newValue);
      onSelect(selected);
    },
    className: "form-control",
  };

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        shouldRenderSuggestions={shouldRenderSuggestions}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default AutocompleteInput;
