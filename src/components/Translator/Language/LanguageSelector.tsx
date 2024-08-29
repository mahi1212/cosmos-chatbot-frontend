import { useState } from 'react';
import { Combobox } from '@headlessui/react';
// import classNames from 'classnames';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAtom } from 'jotai';
import { selectedLanguageAtom } from 'src/store/jotai';

const languages = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Spanish' },
    { id: 3, name: 'Mandarin Chinese' },
    { id: 4, name: 'French' },
    { id: 5, name: 'German' },
    { id: 6, name: 'Russian' },
    { id: 7, name: 'Portuguese' },
    { id: 8, name: 'Arabic' },
    { id: 9, name: 'Italian' },
    { id: 10, name: 'Japanese' },
    { id: 11, name: 'Korean' },
    { id: 12, name: 'Dutch' },
    { id: 13, name: 'Turkish' },
    { id: 14, name: 'Polish' },
    { id: 15, name: 'Vietnamese' },
    { id: 16, name: 'Thai' },
    { id: 17, name: 'Swedish' },
    { id: 18, name: 'Hindi' },
    { id: 19, name: 'Danish' },
    { id: 20, name: 'Finnish' },
    { id: 21, name: 'Hebrew' },
    { id: 22, name: 'Greek' },
    { id: 23, name: 'Norwegian' },
    { id: 24, name: 'Indonesian' },
    { id: 25, name: 'Malay' },
    { id: 26, name: 'Hungarian' },
    { id: 27, name: 'Czech' },
    { id: 28, name: 'Romanian' },
    { id: 29, name: 'Ukrainian' },
    { id: 30, name: 'Bengali' },
    { id: 31, name: 'Filipino' },
    { id: 32, name: 'Urdu' },
    { id: 33, name: 'Persian' },
    { id: 34, name: 'Slovak' },
    { id: 35, name: 'Serbian' },
    { id: 36, name: 'Croatian' },
    { id: 37, name: 'Bulgarian' },
    { id: 38, name: 'Lithuanian' },
    { id: 39, name: 'Latvian' },
    { id: 40, name: 'Estonian' },
    { id: 41, name: 'Slovenian' },
    { id: 42, name: 'Icelandic' },
    { id: 43, name: 'Macedonian' },
    { id: 44, name: 'Bosnian' },
    { id: 45, name: 'Albanian' },
    { id: 46, name: 'Swahili' },
    { id: 47, name: 'Afrikaans' },
    { id: 48, name: 'Basque' },
    { id: 49, name: 'Galician' },
    { id: 50, name: 'Catalan' },
    { id: 51, name: 'Maltese' },
    { id: 52, name: 'Belarusian' },
    { id: 53, name: 'Yiddish' },
    { id: 54, name: 'Haitian Creole' },
    { id: 55, name: 'Pashto' },
    { id: 56, name: 'Amharic' },
    { id: 57, name: 'Georgian' },
    { id: 58, name: 'Armenian' },
    { id: 59, name: 'Kazakh' },
    { id: 60, name: 'Uzbek' },
    { id: 61, name: 'Mongolian' },
    { id: 62, name: 'Tajik' },
    { id: 63, name: 'Turkmen' },
    { id: 64, name: 'Kyrgyz' },
    { id: 65, name: 'Sinhala' },
    { id: 66, name: 'Tamil' },
    { id: 67, name: 'Telugu' },
    { id: 68, name: 'Kannada' },
    { id: 69, name: 'Malayalam' },
    { id: 70, name: 'Marathi' },
    { id: 71, name: 'Gujarati' },
    { id: 72, name: 'Punjabi' },
    { id: 73, name: 'Nepali' },
    { id: 74, name: 'Tigrinya' },
    { id: 75, name: 'Oromo' },
    { id: 76, name: 'Somali' },
    { id: 77, name: 'Azerbaijani' },
    { id: 78, name: 'Kurdish' },
    { id: 79, name: 'Quechua' },
    { id: 80, name: 'Zulu' },
    { id: 81, name: 'Xhosa' },
    { id: 82, name: 'Igbo' },
    { id: 83, name: 'Yoruba' },
    { id: 84, name: 'Hausa' },
    { id: 85, name: 'Fijian' },
    { id: 86, name: 'Tongan' },
    { id: 87, name: 'Samoan' },
    { id: 88, name: 'Maori' },
    { id: 89, name: 'Tahitian' },
    { id: 90, name: 'Lao' },
    { id: 91, name: 'Khmer' },
    { id: 92, name: 'Burmese' },
    { id: 93, name: 'Mongolian' },
    { id: 94, name: 'Tibetan' },
    { id: 95, name: 'Uighur' },
    { id: 96, name: 'Bashkir' },
    { id: 97, name: 'Chuvash' },
    { id: 98, name: 'Tatar' },
    { id: 99, name: 'Chechen' },
    { id: 100, name: 'Macedonian' }
];


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type Language = {
    id: number;
    name: string;
};

export default function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useAtom<Language>(selectedLanguageAtom);
    const [query, setQuery] = useState('');

    const filteredLanguages =
        query === ''
            ? languages
            : languages.filter((language) =>
                language.name.toLowerCase().includes(query.toLowerCase())
            );

    return (
        <Combobox
            as="div"
            value={selectedLanguage}
            onChange={(value: Language | null) => {
                if (value !== null) {
                    setSelectedLanguage(value);
                }
            }}
        >
            <div className="relative -mt-1">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(language: Language) => language?.name.toUpperCase() || ''}
                    placeholder="SELECT LANGUAGE..."
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredLanguages.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredLanguages.map((language) => (
                            <Combobox.Option
                                key={language.id}
                                value={language}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNames('block truncate', selected && 'font-semibold')}>
                                            {language.name}
                                        </span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    );
}