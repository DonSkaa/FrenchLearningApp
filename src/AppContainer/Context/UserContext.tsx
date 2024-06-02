import { getCallApi } from "Functions";

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

const getCurrentStudents = async (
  teacherId: number,
  offset: number,
  limit: number,
  controller: any
): Promise<any> => {
  const response = await callApi(`api/users`, { method: "get" }, null, {
    teacher_id: teacherId,
    offset,
    limit,
  });
  return response.data;
};

export const fetchCurrentStudents = async () => {
  // if (currentUser && currentUser.type === "teacher" && currentUser.id) {
  //   const data = await getCurrentStudents(
  //     currentUser.id,
  //     offset,
  //     limit,
  //     controller
  //   );
  //   setCurrentStudents(data.data);
  //   setTotalItems(data.totalItems);
  // } else {
  //   setCurrentStudents([]);
  //   setTotalItems(0);
  // }
};

export const loadMoreStudents = async () => {
  // if (currentUser && currentUser.type === "teacher" && currentUser.id) {
  //   const newOffset = offset + limit;
  //   const controller = new AbortController();
  //   const data = await getCurrentStudents(
  //     currentUser.id,
  //     newOffset,
  //     limit,
  //     controller
  //   );
  //   setCurrentStudents((prevStudents) =>
  //     prevStudents ? [...prevStudents, ...data.data] : data.data
  //   );
  //   setOffset(newOffset);
  //   setTotalItems(data.totalItems);
  // }
};

// const hasMoreStudents = currentStudents
//   ? currentStudents.length < totalItems
//   : false;
