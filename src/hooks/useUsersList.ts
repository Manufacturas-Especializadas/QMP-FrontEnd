import { useCallback, useEffect, useState } from "react";
import type { UsersList } from "../types/types";
import { usersService } from "../api/services/UsersService";

interface Options {
  isPaged?: boolean;
  pageSize?: number;
}

export const useUserList = (options: Options = {}) => {
  const { isPaged = false, pageSize = 10 } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UsersList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getUsersList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await usersService.usersList();
      console.log("Data: ", data);
      setUsers(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar las lineas";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  const totalPages = Math.ceil(users.length / pageSize) || 1;

  const pagedUsers = isPaged
    ? users.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : users;

  return {
    users: pagedUsers,
    loading,
    error,
    currentPage,
    totalPages,
    refresh: getUsersList,
    goToPage: (page: number) => setCurrentPage(page),
  };
};
