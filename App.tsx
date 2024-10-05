import React, { useState } from 'react';

interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  shoeSize: string;
  club: string;
  day: string;
}

const App = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shoeSize, setShoeSize] = useState('');
  const [club, setClub] = useState('');
  const [day, setDay] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedParticipant, setEditedParticipant] = useState<Participant | null>(null);

  const handleAddParticipant = () => {
    if (editMode) {
      setParticipants(participants.map((p) => (p.id === editedParticipant?.id ? { ...p, firstName, lastName, shoeSize, club, day } : p)));
      setEditMode(false);
      setEditedParticipant(null);
    } else {
      setParticipants([...participants, { id: participants.length + 1, firstName, lastName, shoeSize, club, day }]);
    }
    setFirstName('');
    setLastName('');
    setShoeSize('');
    setClub('');
    setDay('');
  };

  const handleEditParticipant = (participant: Participant) => {
    setEditMode(true);
    setEditedParticipant(participant);
    setFirstName(participant.firstName);
    setLastName(participant.lastName);
    setShoeSize(participant.shoeSize);
    setClub(participant.club);
    setDay(participant.day);
  };

  const handleDeleteParticipant = (id: number) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const getClubColor = (club: string) => {
    switch (club) {
      case 'Tilesno':
        return 'blue';
      case 'Amplua':
        return 'green';
      default:
        return '';
    }
  };

  const getDayColor = (day: string) => {
    switch (day) {
      case 'Понедельник':
        return 'red';
      case 'Среда':
        return 'orange';
      case 'Пятница':
        return 'purple';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Приложение для записи на тренировки Kangoo Jumps</h1>
      <form className="mb-4">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
              Имя
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
              Фамилия
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shoeSize">
              Размер обуви
            </label>
            <select
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="shoeSize"
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
            >
              <option value="">Выберите размер обуви</option>
              <option value="S">S</option>
              <option value="M">M</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="club">
              Клуб
            </label>
            <select
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="club"
              value={club}
              onChange={(e) => setClub(e.target.value)}
            >
              <option value="">Выберите клуб</option>
              <option value="Tilesno">Tilesno</option>
              <option value="Amplua">Amplua</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="day">
              День
            </label>
            <select
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Выберите день</option>
              <option value="Понедельник">Понедельник</option>
              <option value="Среда">Среда</option>
              <option value="Пятница">Пятница</option>
            </select>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAddParticipant}
        >
          {editMode ? 'Сохранить' : 'Добавить'}
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4">Список участников</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id} className="mb-4">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {participant.firstName} {participant.lastName}
                </span>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Клуб: <span className={`text-${getClubColor(participant.club)}`}>{participant.club}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  День: <span className={`text-${getDayColor(participant.day)}`}>{participant.day}</span>
                </span>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Размер обуви: {participant.shoeSize}
                </span>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleEditParticipant(participant)}
            >
              Редактировать
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleDeleteParticipant(participant.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;