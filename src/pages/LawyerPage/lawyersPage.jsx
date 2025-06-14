import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@styles/lawyersPage.module.css';
import Input from '@components/Input/index.jsx';
import LawyerCard from '@components/LawyerCard/index.jsx';
import useAuth from '@hooks/useAuth';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import scope from '@assets/icons/scope.svg';

const Lawyers = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const availableSpecializations = [
    'Уголовное право',
    'Гражданское право',
    'Семейное право',
    'Трудовое право',
    'Налоговое право',
  ];

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/lawyers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
          }
          throw new Error('Ошибка при загрузке юристов');
        }

        const { data } = await response.json();
        const transformedLawyers = data.map((lawyer) => ({
          ...lawyer,
          name: `${lawyer.firstName} ${lawyer.lastName} ${lawyer.patronymic || ''}`.trim(),
          specializations: lawyer.LawyerProfile?.Specializations?.map(s => s.name) || ['Не указано'],
          city: lawyer.LawyerProfile?.region || 'Неизвестно',
          avatar: lawyer.avatarPath || '/default-avatar.png',
          rating: lawyer.LawyerProfile?.rating || 0,
          price: lawyer.LawyerProfile?.price || 0,
        }));

        setLawyers(transformedLawyers);
        setFilteredLawyers(transformedLawyers);
      } catch (error) {
        console.error('Ошибка загрузки юристов:', error);
      }
    };

    if (accessToken) {
      fetchLawyers();
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedSpecializations, priceRange, ratingRange, lawyers]);

  const applyFilters = () => {
    let filtered = [...lawyers];

    if (searchQuery) {
      filtered = filtered.filter((lawyer) =>
        lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSpecializations.length > 0) {
      filtered = filtered.filter((lawyer) =>
        selectedSpecializations.some(spec => 
          lawyer.specializations.includes(spec)
        )
      );
    }

    filtered = filtered.filter(
      (lawyer) => lawyer.price >= priceRange[0] && lawyer.price <= priceRange[1]
    );

    filtered = filtered.filter(
      (lawyer) => lawyer.rating >= ratingRange[0] && lawyer.rating <= ratingRange[1]
    );

    setFilteredLawyers(filtered);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingRangeChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  return (
    <div className={styles.lawyers}>
      <div className={styles.container}>
        <aside className={styles.filters}>
          <h3 className={styles.filtersTitle}>Фильтры</h3>

          <div className={styles.filterSection}>
            <label htmlFor="search" className={styles.filterLabel}>
              Поиск по имени
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Введите имя юриста"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Специализация</label>
            <div className={styles.selectWrapper}>
              <Autocomplete
                multiple
                options={availableSpecializations}
                value={selectedSpecializations}
                onChange={(event, newValue) => setSelectedSpecializations(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Выберите специализации"
                    className={styles.autocompleteInput}
                  />
                )}
                className={styles.autocomplete}
              />
            </div>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Рейтинг</label>
            <div className={styles.sliderContainer}>
              <Slider
                value={ratingRange}
                onChange={handleRatingRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.1}
                className={styles.muiSlider}
              />
              <div className={styles.rangeValues}>
                <span>{ratingRange[0]}</span> - <span>{ratingRange[1]}</span>
              </div>
            </div>
          </div>

          <button onClick={applyFilters} className={styles.searchButton}>
            Найти
          </button>
        </aside>

        <div className={styles.lawyersList}>
          <ul className={styles.list}>
            {filteredLawyers.length > 0 ? (
              filteredLawyers.map((lawyer) => (
                <li key={lawyer.id}>
                  <LawyerCard
                    id={lawyer.id}
                    name={lawyer.name}
                    specialization={lawyer.specializations.join(', ')}
                    city={lawyer.city}
                    photo={lawyer.avatar}
                    rating={lawyer.rating}
                  />
                </li>
              ))
            ) : (
              <div className={styles.lawyerNone}>
                <img src={scope} alt="scope" />
                <h3 className={styles.lawNonTitle}>Юристов нет</h3>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lawyers;