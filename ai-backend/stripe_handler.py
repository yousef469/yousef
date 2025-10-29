"""
Stripe payment handler for subscriptions
"""
import os
import stripe

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

# Your Stripe Price IDs (create these in Stripe dashboard)
PRICE_IDS = {
    'starter': os.environ.get('STRIPE_PRICE_STARTER', 'price_starter'),
    'pro': os.environ.get('STRIPE_PRICE_PRO', 'price_pro'),
    'master': os.environ.get('STRIPE_PRICE_MASTER', 'price_master')
}

def create_checkout_session(price_id, user_id, success_url, cancel_url):
    """Create Stripe checkout session"""
    try:
        # Map plan names to actual Stripe price IDs
        actual_price_id = PRICE_IDS.get(price_id, price_id)
        
        session = stripe.checkout.Session.create(
            payment_method_types=['card', 'paypal', 'link'],  # Card, PayPal, and Stripe Link
            line_items=[{
                'price': actual_price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=success_url,
            cancel_url=cancel_url,
            client_reference_id=user_id,
            customer_email=None,  # Let Stripe collect email
            metadata={
                'user_id': user_id
            },
            allow_promotion_codes=True,  # Allow discount codes
            billing_address_collection='auto',  # Collect billing address
            # automatic_tax={'enabled': True},  # Disabled - requires business address in Stripe dashboard
        )
        
        return {'success': True, 'session_id': session.id, 'url': session.url}
        
    except Exception as e:
        print(f"Stripe checkout error: {str(e)}")
        return {'success': False, 'error': str(e)}

def get_subscription_status(user_id):
    """Get user's subscription status"""
    try:
        # Search for customer by metadata
        customers = stripe.Customer.list(limit=1, email=user_id)
        
        if not customers.data:
            return {'plan': 'free', 'credits': 5, 'status': 'active'}
        
        customer = customers.data[0]
        subscriptions = stripe.Subscription.list(customer=customer.id, limit=1)
        
        if not subscriptions.data:
            return {'plan': 'free', 'credits': 5, 'status': 'active'}
        
        subscription = subscriptions.data[0]
        
        # Get plan details
        plan_name = 'free'
        credits = 5
        
        if subscription.status == 'active':
            price_id = subscription['items'].data[0].price.id
            
            if price_id == PRICE_IDS['starter']:
                plan_name = 'starter'
                credits = 50
            elif price_id == PRICE_IDS['pro']:
                plan_name = 'pro'
                credits = 200
            elif price_id == PRICE_IDS['master']:
                plan_name = 'master'
                credits = -1  # Infinite
        
        return {
            'plan': plan_name,
            'credits': credits,
            'status': subscription.status,
            'current_period_end': subscription.current_period_end
        }
        
    except Exception as e:
        print(f"Get subscription error: {str(e)}")
        return {'plan': 'free', 'credits': 5, 'status': 'active'}

def cancel_subscription(user_id):
    """Cancel user's subscription"""
    try:
        customers = stripe.Customer.list(limit=1, email=user_id)
        
        if not customers.data:
            return {'success': False, 'error': 'No customer found'}
        
        customer = customers.data[0]
        subscriptions = stripe.Subscription.list(customer=customer.id, limit=1)
        
        if not subscriptions.data:
            return {'success': False, 'error': 'No subscription found'}
        
        subscription = subscriptions.data[0]
        
        # Cancel at period end (don't cancel immediately)
        stripe.Subscription.modify(
            subscription.id,
            cancel_at_period_end=True
        )
        
        return {'success': True, 'message': 'Subscription will cancel at period end'}
        
    except Exception as e:
        print(f"Cancel subscription error: {str(e)}")
        return {'success': False, 'error': str(e)}

def handle_webhook(payload, sig_header):
    """Handle Stripe webhook events"""
    try:
        webhook_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')
        
        if not webhook_secret:
            return {'success': False, 'error': 'Webhook secret not configured'}
        
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
        
        # Handle different event types
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            user_id = session.get('client_reference_id')
            
            print(f"Payment successful for user: {user_id}")
            # TODO: Update user's subscription in database
            
        elif event['type'] == 'customer.subscription.deleted':
            subscription = event['data']['object']
            print(f"Subscription cancelled: {subscription.id}")
            # TODO: Update user's subscription status
            
        return {'success': True}
        
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        return {'success': False, 'error': str(e)}
