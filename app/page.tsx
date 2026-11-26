"use client";

import { useState } from "react";

type Status = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED";

type Idee = {
  id: number;
  titel: string;
  beschreibung: string;
  istAusgewaehlt: boolean;
  person: "A" | "B" | null;
  zeit: number;
  status: Status;
  version: number;
  briefingText: string;
};

const START_IDEEN: Idee[] = [
  {
    id: 1,
    titel: "Idee 1",
    beschreibung: "Herbst-Trends",
    istAusgewaehlt: false,
    person: null,
    zeit: 0,
    status: "DRAFT",
    version: 1,
    briefingText:
      "Hier ist der Text für die Herbst-Trends. Ein cooler Insta-Post über neue Brillenformen.",
  },
  {
    id: 2,
    titel: "Idee 2",
    beschreibung: "Neue Brillenmarke",
    istAusgewaehlt: false,
    person: null,
    zeit: 0,
    status: "DRAFT",
    version: 1,
    briefingText: "",
  },
  {
    id: 3,
    titel: "Idee 3",
    beschreibung: "Kinderbrillen",
    istAusgewaehlt: false,
    person: null,
    zeit: 0,
    status: "DRAFT",
    version: 1,
    briefingText: "",
  },
  {
    id: 4,
    titel: "Idee 4",
    beschreibung: "Sonnenbrillen im Winter",
    istAusgewaehlt: false,
    person: null,
    zeit: 0,
    status: "DRAFT",
    version: 1,
    briefingText: "",
  },
  {
    id: 5,
    titel: "Idee 5",
    beschreibung: "Interview mit Optiker",
    istAusgewaehlt: false,
    person: null,
    zeit: 0,
    status: "DRAFT",
    version: 1,
    briefingText: "",
  },
];

const Home = () => {
  const [ideen, setIdeen] = useState<Idee[]>(START_IDEEN);
  const [aktiveIdeeId, setAktiveIdeeId] = useState<number | null>(null);
  const [ausgewaehltePerson, setAusgewaehltePerson] = useState<"A" | "B">("A");
  const [ausgewaehlteZeit, setAusgewaehlteZeit] = useState<number>(30);
  const [detailIdeeId, setDetailIdeeId] = useState<number | null>(null);

  const zeitPersonA = ideen
    .filter((i) => i.person === "A")
    .reduce((s, i) => s + i.zeit, 0);
  const zeitPersonB = ideen
    .filter((i) => i.person === "B")
    .reduce((s, i) => s + i.zeit, 0);
  const anzahlAusgewaehlt = ideen.filter((i) => i.istAusgewaehlt).length;

  const oeffneModal = (id: number) => {
    if (anzahlAusgewaehlt >= 3) {
      alert("Du kannst maximal 3 Ideen für diese Woche auswählen!");
      return;
    }
    setAktiveIdeeId(id);
  };

  const speichereAuswahl = () => {
    if (aktiveIdeeId === null) return;
    setIdeen(
      ideen.map((i) =>
        i.id === aktiveIdeeId
          ? {
              ...i,
              istAusgewaehlt: true,
              person: ausgewaehltePerson,
              zeit: ausgewaehlteZeit,
            }
          : i,
      ),
    );
    setAktiveIdeeId(null);
  };

  const aendereStatus = (id: number, neuerStatus: Status) => {
    setIdeen(
      ideen.map((i) => (i.id === id ? { ...i, status: neuerStatus } : i)),
    );
  };

  const aendereText = (id: number, neuerText: string) => {
    setIdeen(
      ideen.map((i) => {
        if (i.id === id) {
          if (i.briefingText !== neuerText) {
            return {
              ...i,
              briefingText: neuerText,
              status: "DRAFT",
              version: i.version + 1,
            };
          }
        }
        return i;
      }),
    );
  };

  const veroeffentlichen = (id: number) => {
    const idee = ideen.find((i) => i.id === id);
    if (!idee || idee.status !== "APPROVED") return;

    const payload = {
      event: "PUBLISH_POST",
      timestamp: new Date().toISOString(),
      ideaId: idee.id,
      version: idee.version,
      text: idee.briefingText,
      channels: ["Instagram", "LinkedIn"],
    };
    alert(
      "An Publishing-Schnittstelle übergeben:\n\n" +
        JSON.stringify(payload, null, 2),
    );
    aendereStatus(id, "PUBLISHED");
  };

  if (detailIdeeId !== null) {
    const idee = ideen.find((i) => i.id === detailIdeeId)!;
    return (
      <div className="p-8 font-sans max-w-3xl mx-auto">
        <button
          onClick={() => setDetailIdeeId(null)}
          className="border-2 rounded-2xl cursor-pointer border-blue-500 text-blue-500 px-4 py-1 mb-6"
        >
          &larr; Zurück zum Dashboard
        </button>

        <div className="border-2 rounded-2xl border-blue-500 p-6">
          <h1 className="text-2xl font-bold mb-2">
            {idee.titel} (Version {idee.version})
          </h1>
          <p className="mb-4 text-gray-400">
            Status: <strong className="text-white">{idee.status}</strong>
          </p>

          <label className="block mb-2 font-bold">
            Briefing / Beitragstext:
          </label>
          <textarea
            className="w-full h-32 p-2 bg-gray-800 text-white border rounded-2xl border-gray-600 mb-4"
            value={idee.briefingText}
            onChange={(e) => aendereText(idee.id, e.target.value)}
            placeholder="Schreibe hier den Text für den Post..."
          />

          <div className="flex gap-2">
            {idee.status === "DRAFT" && (
              <button
                onClick={() => aendereStatus(idee.id, "IN_REVIEW")}
                className="bg-blue-600 text-white px-4 py-2 cursor-pointer"
              >
                Zur Prüfung einreichen
              </button>
            )}
            {idee.status === "IN_REVIEW" && (
              <button
                onClick={() => aendereStatus(idee.id, "APPROVED")}
                className="bg-green-600 text-white px-4 py-2 cursor-pointer"
              >
                Freigeben
              </button>
            )}
            {idee.status === "APPROVED" && (
              <button
                onClick={() => veroeffentlichen(idee.id)}
                className="bg-purple-600 text-white px-4 py-2 cursor-pointer"
              >
                An Schnittstelle übergeben (Publish)
              </button>
            )}
            {idee.status === "PUBLISHED" && (
              <span className="text-green-500 font-bold">
                Erfolgreich übergeben!
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      <div className="border-2 rounded-2xl border-blue-500 p-4 mb-8">
        <h1 className="text-xl font-bold mb-4">Dashboard (Zeiten)</h1>
        <div className="flex gap-4">
          <div
            className={`p-2 border rounded-2xl ${zeitPersonA > 90 ? "bg-red-900 border-red-500 text-red-200" : "bg-gray-800 border-blue-500"}`}
          >
            Person A: {zeitPersonA} / 90 Min
          </div>
          <div
            className={`p-2 border rounded-2xl ${zeitPersonB > 150 ? "bg-red-900 border-red-500 text-red-200" : "bg-gray-800 border-blue-500"}`}
          >
            Person B: {zeitPersonB} / 150 Min
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {ideen.map((idee) => (
          <div
            key={idee.id}
            className="border-2 rounded-2xl border-blue-500 p-4 w-56 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-bold">{idee.titel}</h2>
              <p className="text-sm mb-2">{idee.beschreibung}</p>
              {idee.istAusgewaehlt && (
                <p className="text-xs text-blue-300">
                  Zugewiesen: Person {idee.person} ({idee.zeit} Min)
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {!idee.istAusgewaehlt ? (
                <button
                  onClick={() => oeffneModal(idee.id)}
                  className="border rounded-2xl border-blue-500 px-2 py-1 hover:bg-blue-900 cursor-pointer"
                >
                  Auswählen
                </button>
              ) : (
                <button
                  onClick={() => setDetailIdeeId(idee.id)}
                  className="border rounded-2xl border-white bg-gray-800 px-2 py-1 hover:bg-gray-700 cursor-pointer"
                >
                  Detail öffnen
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {aktiveIdeeId !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 border-2 rounded-2xl border-blue-500 p-6 w-96 text-white">
            <h2 className="font-bold mb-4">Idee zuweisen</h2>
            <div className="mb-4">
              <label className="block mb-1">Wer macht es?</label>
              <select
                value={ausgewaehltePerson}
                onChange={(e) =>
                  setAusgewaehltePerson(e.target.value as "A" | "B")
                }
                className="border rounded-2xl border-blue-500 p-1 w-full bg-gray-800"
              >
                <option value="A">Person A</option>
                <option value="B">Person B</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">
                Wie lange dauert es? (Minuten)
              </label>
              <input
                type="number"
                value={ausgewaehlteZeit}
                onChange={(e) => setAusgewaehlteZeit(Number(e.target.value))}
                className="border rounded-2xl border-blue-500 p-1 w-full bg-gray-800"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setAktiveIdeeId(null)}
                className="border rounded-2xl border-white px-4 py-1 cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                onClick={speichereAuswahl}
                className="border rounded-2xl border-blue-500 bg-blue-600 px-4 py-1 cursor-pointer"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
