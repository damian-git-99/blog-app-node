const { createLogger, format, transports, addColors } = require('winston')

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3
}

let myCustomFormat = format.combine(
  format.label({ label: '[LOGGER]' }),
  format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
  format.printf(
    (info: any) =>
      ` ${info.label} ${info.timestamp}  ${info.level} : ${info.message}`
  )
)

addColors({
  info: 'bold blue',
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'green'
})

export const logger = createLogger({
  level: 'info',
  levels: logLevels,
  format: format.combine(myCustomFormat),
  transports: [new transports.File({ filename: 'logs/app.log' })]
})

if (process.env.NODE_ENV != 'prod') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize({ all: true }), myCustomFormat)
    })
  )
}
