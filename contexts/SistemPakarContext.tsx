import { createContext, ReactNode, useContext, useState } from "react";

type ContextType = {
  pasien: any;
  setPasien: Function;
  diagnosa: any;
  setDiagnosa: Function;
  jawaban: any;
  setJawaban: Function;
};

const ContextDefaultValues: ContextType = {
  pasien: null,
  setPasien: () => {},
  diagnosa: null,
  setDiagnosa: () => {},
  jawaban: null,
  setJawaban: () => {},
};

const SistemPakarContext = createContext<ContextType>(ContextDefaultValues);

export function useSistemPakar() {
  return useContext(SistemPakarContext);
}

type Props = {
  children: ReactNode;
};

export function SistemPakarProvider({ children }: Props) {
  const [pasien, setPasien] = useState();
  const [jawaban, setJawaban] = useState();
  const [diagnosa, setDiagnosa] = useState();

  const value = {
    pasien,
    setPasien,
    diagnosa,
    setDiagnosa,
    jawaban,
    setJawaban,
  };

  return (
    <>
      <SistemPakarContext.Provider value={value}>
        {children}
      </SistemPakarContext.Provider>
    </>
  );
}
