import { useState } from "react";
import Autosuggest from "react-autosuggest";

function shouldRenderSuggestions() {
  return true;
}

const AutocompleteInput = ({ options = [], selected, onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");

    return options.filter((option) => regex.test(option.label));
  }

  const getSuggestionValue = (suggestion) => {
    // setSelected(suggestion.label);
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
    value: selected,
    onChange: (event, { newValue }) => {
      onSelect(newValue);
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
