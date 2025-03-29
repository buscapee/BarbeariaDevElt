"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "../_components/ui/button"
import { toast } from "sonner"
import { authOptions } from "../_lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { getUserRole } from "../_actions/get-user-role"

interface Booking {
  id: string
  date: string
  status: string
  user: {
    name: string
    email: string
  }
  service: {
    name: string
    price: number
    barbershop: {
      name: string
    }
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getServerSession(authOptions)
      if (!session?.user) {
        router.push("/login")
        return
      }

      const userRole = await getUserRole(session.user.id)
      if (userRole !== "ADMIN") {
        router.push("/")
        return
      }

      setIsAdmin(true)
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAdmin) return

      try {
        const response = await fetch("/api/admin/bookings")
        if (!response.ok) {
          throw new Error("Falha ao carregar agendamentos")
        }
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        toast.error("Erro ao carregar agendamentos")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [isAdmin])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Falha ao cancelar agendamento")
      }

      setBookings(bookings.filter(booking => booking.id !== bookingId))
      toast.success("Agendamento cancelado com sucesso")
    } catch (error) {
      toast.error("Erro ao cancelar agendamento")
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="mb-4 text-2xl font-bold">Painel Administrativo</h1>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-lg border p-4 shadow-sm"
          >
            <div className="mb-2">
              <h2 className="font-semibold">{booking.service.barbershop.name}</h2>
              <p className="text-sm text-gray-500">{booking.service.name}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm">Cliente: {booking.user.name}</p>
              <p className="text-sm">Email: {booking.user.email}</p>
              <p className="text-sm">Data: {booking.date}</p>
              <p className="text-sm">Valor: R$ {booking.service.price.toFixed(2)}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleCancelBooking(booking.id)}
            >
              Cancelar
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
} 