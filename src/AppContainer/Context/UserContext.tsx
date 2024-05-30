import React, {
  createContext,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import { CurrentUser } from "FormatedDatabase";
import { useCallApi } from "Functions";

interface UserContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  currentStudents: CurrentUser[] | null;
  setCurrentStudents: React.Dispatch<
    React.SetStateAction<CurrentUser[] | null>
  >;
  loadMoreStudents: () => Promise<void>;
  hasMoreStudents: boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>({
  currentUser: null,
  setCurrentUser: function (value: SetStateAction<CurrentUser | null>): void {
    throw new Error("Function not implemented.");
  },
  currentStudents: null,
  setCurrentStudents: function (
    value: SetStateAction<CurrentUser[] | null>
  ): void {
    throw new Error("Function not implemented.");
  },
  loadMoreStudents: async () => {
    throw new Error("Function not implemented.");
  },
  hasMoreStudents: false,
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
});

function UserContextProvider(props: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentStudents, setCurrentStudents] = useState<CurrentUser[] | null>(
    []
  );
  const [offset, setOffset] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const callApi = useCallApi();
  const limit = 10;

  const getCurrentStudents = async (
    teacherId: number,
    offset: number,
    limit: number,
    controller: any
  ): Promise<any> => {
    const response = await callApi(
      `api/users`,
      { method: "get" },
      controller.signal,
      { teacher_id: teacherId, offset, limit }
    );
    return response.data;
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchCurrentStudents = async () => {
      if (currentUser && currentUser.type === "teacher" && currentUser.id) {
        const data = await getCurrentStudents(
          currentUser.id,
          offset,
          limit,
          controller
        );
        setCurrentStudents(data.data);
        setTotalItems(data.totalItems);
      }
    };
    fetchCurrentStudents();
    return () => {
      controller.abort();
    };
  }, [currentUser]);

  const loadMoreStudents = async () => {
    if (currentUser && currentUser.type === "teacher" && currentUser.id) {
      const newOffset = offset + limit;
      const controller = new AbortController();
      const data = await getCurrentStudents(
        currentUser.id,
        newOffset,
        limit,
        controller
      );
      setCurrentStudents((prevStudents) =>
        prevStudents ? [...prevStudents, ...data.data] : data.data
      );
      setOffset(newOffset);
      setTotalItems(data.totalItems);
    }
  };

  const hasMoreStudents = currentStudents
    ? currentStudents.length < totalItems
    : false;

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentStudents,
        setCurrentStudents,
        loadMoreStudents,
        hasMoreStudents,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
