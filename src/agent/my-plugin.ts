import { IAgentPlugin } from '@veramo/core'
import { IMyAgentPlugin, IMyAgentPluginFooArgs, IContext } from '../types/IMyAgentPlugin'
import { schema } from '../index'

/** 
 * {@inheritDoc IMyAgentPlugin}
 * @beta
 */
export class MyAgentPlugin implements IAgentPlugin {
  
  readonly schema = schema.IMyAgentPlugin

  readonly eventTypes = ['validatedMessage']
  
  readonly methods: IMyAgentPlugin = {
    myPluginFoo: this.myPluginFoo.bind(this)
  }

  public async onEvent(event: { type: string; data: any }, context: IContext) {
    await context.agent.emit('my-event', { foo: event.data.id })
  }

  /** {@inheritDoc IMyAgentPlugin.myPluginFoo} */
  private async myPluginFoo(args: IMyAgentPluginFooArgs, context: IContext): Promise<string> {
    const didDoc = await context.agent.resolveDid({ didUrl: args.did })
    return args.bar
  }
}