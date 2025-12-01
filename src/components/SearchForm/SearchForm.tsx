import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { GeoEntity } from '../../api/api';
import { fetchCountriesThunk, fetchGeoThunk, clearOptions } from '../../store/slices/geoSearchSlice';
import { RootState } from '../../store';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm: React.FC<{ onSubmit: (value: GeoEntity) => void }> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<GeoEntity | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector((state: RootState) => state.geoSearch.options);

  const handleInputClick = async () => {
    setDropdownOpen(true);
    if (!inputValue || selected?.type === 'country') {
      dispatch(fetchCountriesThunk());
    } else {
      dispatch(fetchGeoThunk(inputValue));
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setDropdownOpen(true);
    dispatch(fetchGeoThunk(value));
    setSelected(null);
  };

  const handleSelect = (item: GeoEntity) => {
    setSelected(item);
    setInputValue(item.name);
    setDropdownOpen(false);
  };

  const submitSelected = async () => {
    if (selected) {
      onSubmit(selected);
      setDropdownOpen(false);
    } else if (inputValue) {
      const resultAction = await dispatch(fetchGeoThunk(inputValue));
      if (fetchGeoThunk.fulfilled.match(resultAction)) {
        const found = resultAction.payload.find(
          item => item.name.toLowerCase() === inputValue.toLowerCase()
        );
        if (found) {
          onSubmit(found);
        } else {
          console.log('Нічого не знайдено', resultAction.payload);
        }
      }
      setDropdownOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSelected();
  };

  const handleEnterSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitSelected();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <form className="search-form" onSubmit={handleSubmit} ref={formRef}>
      <h2 className="search-form__title">Форма пошуку турів</h2>
      <div className="search-form__control">
        <input
          ref={inputRef}
          type="text"
          placeholder="Куди хочете поїхати?"
          value={inputValue}
          onClick={handleInputClick}
          onChange={handleInputChange}
          onFocus={handleInputClick}
          className="search-form__input"
          autoComplete="off"
          onKeyDown={handleEnterSubmit}
        />
        {inputValue && (
          <button
            type="button"
            className="search-form__clear"
            onClick={() => {
              setInputValue('');
              setSelected(null);
              dispatch(clearOptions());
              setDropdownOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Очистити"
          >
            ×
          </button>
        )}
        {dropdownOpen && (
          <Dropdown
            options={options}
            onSelect={handleSelect}
            getKey={item => item.id}
            renderOption={item => (
              <>
                <span>
                  {item.type === 'country' && <img className='dropdown__flag' src={item.flag} />}
                  {item.type === 'hotel' && <span className='dropdown__icon' role="img" aria-label="Готель">🏨</span>}
                  {item.type === 'city' && <span className='dropdown__icon' role="img" aria-label="Місто">🏙️</span>}
                </span>
                <span>{item.name}</span>
              </>
            )}
          />
        )}
      </div>
      <Button
        type="submit"
        variant="default"
      >
        Знайти
      </Button>
    </form>
  );
};

export default SearchForm;