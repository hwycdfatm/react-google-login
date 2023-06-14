const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

app.post('/token', async function (req, res) {
	try {
		const { access_token } = req.body

		if (!access_token) {
			return res.status(400).json({ message: 'Missing field' })
		}

		const result = await fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access_token}`,
					Accept: 'application/json',
				},
			}
		)
		const { email, picture, name } = await result.json()

		const user = {
			name,
			email,
			picture,
		}

		return res.status(200).json({
			user,
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

app.listen(5000)
