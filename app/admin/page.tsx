"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "../_components/header"
import { Button } from "../_components/ui/button"
import { toast } from "sonner"

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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const fetchBookings = async () => {
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
  }, [])

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

  if (status === "loading" || isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        <h1 className="mb-6 text-2xl font-bold">Painel Administrativo</h1>

        <div className="rounded-lg border p-5">
          <h2 className="mb-4 text-lg font-bold">Agendamentos</h2>
          
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-center text-gray-500">Nenhum agendamento encontrado</p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{booking.service.barbershop.name}</p>
                      <p className="text-sm text-gray-500">Serviço: {booking.service.name}</p>
                      <p className="text-sm text-gray-500">
                        Cliente: {booking.user.name} ({booking.user.email})
                      </p>
                      <p className="text-sm text-gray-500">
                        Data: {new Date(booking.date).toLocaleString("pt-BR")}
                      </p>
                      <p className="text-sm text-gray-500">
                        Valor: {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL"
                        }).format(booking.service.price)}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
} 