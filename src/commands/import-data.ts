import {Command, flags} from '@oclif/command'
import {backendFromOpts, endpointFlags, runCommand} from '../lib'
import {cli} from 'cli-ux'
import {spawn} from 'child_process'
import {ENOENT} from 'constants'
import {join, resolve} from 'path'

export default class ImportData extends Command {
  static description = 'Import your data back via live loader (requires docker)'

  static examples = [
    '$ slash-graphql import-data -e https://frozen-mango.cloud.dgraph.io/graphql -t <apiToken> ./import-directory',
  ]

  static flags = {
    ...endpointFlags,
    confirm: flags.boolean({char: 'y', description: 'Skip Confirmation', default: false}),
  }

  static args = [{name: 'input', description: 'Input Directory', required: true}]

  confirm() {
    this.log('This will import data into your backend. This cannot be reversed.')
    return cli.confirm('Are you sure you want to proceed?')
  }

  async run() {
    const opts = this.parse(ImportData)
    const backend = await backendFromOpts(opts)
    const inputFile = join(resolve(opts.args.input), 'g01.json.gz')

    if (!(opts.flags.confirm || await this.confirm())) {
      this.log('Aborting')
    }

    const code = await runCommand('docker', 'run', '-it', '--rm', '-v', `${inputFile}:/tmp/g01.json.gz`, 'dgraph/dgraph:v20.07-slash',
      'dgraph', 'live', `--slash_grpc_endpoint=${backend.getGRPCEndpoint()}`, '-f', '/tmp/g01.json.gz', '-t', backend.getToken())
    if (code !== 0) {
      this.error('Something went wrong. There is likely more information above')
      return
    }
    this.log('Sucessfully imported!')
  }
}