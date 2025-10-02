import Cases from '../../core/use-cases'

export class BookingController {
  async create(req, res) {
    const params = req.body

    const data = await Cases.BookingCase.create(
      params.event_id,
      req.session.user.userId
    )

    if (data.ok) {
      return res.status(201).json({ ok: data.ok, message: data.message })
    } else {
      return res.status(400).json({ ok: data.ok, message: data.message })
    }
  }
}
