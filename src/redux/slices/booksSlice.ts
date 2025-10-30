import { createSlice } from "@reduxjs/toolkit";

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
  availability: boolean;
}

interface BooksInitialState {
  data: Book[];
  isLoading: boolean;
  error: null | string;
}

const initialState: BooksInitialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: "Books",
  initialState: initialState, // accessed through useSelector
  reducers: {
    addBook: (state) => {
      state.data = [
        ...state.data,
        {
          id: state.data.length + 1,
          title: "New Book",
          author: "Author",
          availability: true,
          quantity: 100,
        },
      ];
    },
  },
});

export const { addBook } = booksSlice.actions; // accessed through useDispatch
export default booksSlice.reducer;