import { getCallApi } from "Functions";
import { toJS } from "mobx";
import { store } from "store";

// interface UserContextType {
//   currentUser: CurrentUser | null;
//   setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
//   currentStudents: CurrentUser[] | null;
//   setCurrentStudents: React.Dispatch<
//     React.SetStateAction<CurrentUser[] | null>
//   >;
//   loadMoreStudents: () => Promise<void>;
//   hasMoreStudents: boolean;
//   logout: () => void;
// }

// export const UserContext = createContext<UserContextType>({
//   currentUser: null,
//   setCurrentUser: function (value: SetStateAction<CurrentUser | null>): void {
//     throw new Error("Function not implemented.");
//   },
//   currentStudents: null,
//   setCurrentStudents: function (
//     value: SetStateAction<CurrentUser[] | null>
//   ): void {
//     throw new Error("Function not implemented.");
//   },
//   loadMoreStudents: async () => {
//     throw new Error("Function not implemented.");
//   },
//   hasMoreStudents: false,
//   logout: function (): void {
//     throw new Error("Function not implemented.");
//   },
// });

// function UserContextProvider(props: React.PropsWithChildren<{}>) {
//   const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
//   const [currentStudents, setCurrentStudents] = useState<CurrentUser[] | null>(
//     []
//   );
//   const [offset, setOffset] = useState<number>(0);
//   const [totalItems, setTotalItems] = useState<number>(0);

const callApi = getCallApi();
// const limit = 10;

export const getCurrentStudents = async (
  teacherId: number,
  offset: number,
  limit: number,
  controller: AbortController
) => {
  const response = await callApi(
    `api/users`,
    { method: "get" },
    controller.signal,
    {
      teacher_id: teacherId,
      offset,
      limit,
    }
  );
  return response.data;
};

export const loadMoreStudents = async (): Promise<void> => {
  if (store.currentUser && store.offset && store.limit) {
    console.log(toJS(store.currentUser));
    console.log(toJS(store.offset));
    console.log(toJS(store.limit));

    const newOffset = store.offset + store.limit;
    const controller = new AbortController();
    const response = await getCurrentStudents(
      store.currentUser.id,
      newOffset,
      store.limit,
      controller
    );
    console.log(response);

    store.currentStudents = store.currentStudents
      ? [...store.currentStudents, ...response.data.data]
      : response.data.data;
    store.offset = newOffset;
    store.totalItems = response.data.totalItems;
  }
};
